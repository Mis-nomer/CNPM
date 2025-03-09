import { listUser } from '@/api/user'
import { UserType } from '@/type/user'
import { useState, useEffect } from 'react'

const useAuthUser = () => {
  const [auth, setAuth] = useState<UserType>({} as UserType)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const grabMe = async () => {
      try {
        setLoading(true)
        const { data } = await listUser()
        if (Array.isArray(data)) {
          setAuth(data.at(0))
        } else {
          setAuth(data)
        }
      } catch (err) {
        setError(err as any)
      } finally {
        setLoading(false)
      }
    }

    void grabMe()
  }, [])

  return { auth, loading, error }
}

export default useAuthUser