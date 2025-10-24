import { useEffect, useState } from 'react'
import { Box, Spinner, Text, Button, useToken } from '@chakra-ui/react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { fetchContributors } from '../api/github'

export default function ContributorsChart({ owner, repo }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(false)
  const [brand500] = useToken('colors', ['brand.500'])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchContributors(owner, repo)
      const formatted = res.map(c => ({ name: c.login, value: c.contributions }))
      setData(formatted)
    } catch (e) {
      setError('无法获取贡献者统计')
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
        {visible ? '隐藏贡献者统计' : '显示贡献者统计'}
      </Button>
      {visible && (
        <Box mt={3}>
          {loading && <Spinner />}
          {error && <Text color="red.500">{error}</Text>}
          {!loading && data.length > 0 && (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={brand500} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Box>
      )}
    </Box>
  )
}