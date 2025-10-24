import { useEffect, useState } from 'react'
import { Box, Spinner, Text, Button, useToken } from '@chakra-ui/react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'
import { fetchCommitActivity } from '../api/github'

function formatWeeks(data = []) {
  // 仅显示最近12周，格式化为 { week: 'MM/DD', total }
  const last = data.slice(-12)
  return last.map(w => {
    const d = new Date(w.week * 1000)
    const label = `${d.getMonth() + 1}/${d.getDate()}`
    return { week: label, total: w.total }
  })
}

export default function ActivityChart({ owner, repo }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const [brand500] = useToken('colors', ['brand.500'])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchCommitActivity(owner, repo)
      if (res.status === 202 || res.data?.processing) {
        // GitHub统计尚未就绪，稍后重试
        setTimeout(load, 2000)
        return
      }
      setData(formatWeeks(res.data))
    } catch (e) {
      setError('无法获取活跃度数据')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (visible && data.length === 0) {
      load()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Box mt={3}>
      <Button onClick={() => setVisible(v => !v)}>
        {visible ? '隐藏活跃度图表' : '显示活跃度图表'}
      </Button>
      {visible && (
        <Box mt={3}>
          {loading && <Spinner />}
          {error && <Text color="red.500">{error}</Text>}
          {!loading && data.length > 0 && (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke={brand500} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      )}
    </Box>
  )
}