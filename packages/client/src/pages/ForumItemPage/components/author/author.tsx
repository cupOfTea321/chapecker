import { useEffect, useState } from 'react'
import { getAuthor } from '../forumMessagesList/actions'
import { IUser } from '../../../Profile/model'
import Loader from '../../../../components/loader/loader'

const Author = ({ id }: { id: number }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [load, setLoad] = useState(true)
  const [trie, setTry] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await getAuthor(id)
        setUser(data)
      } catch (err) {
        console.log(err)
      } finally {
        setTry(true)
        setLoad(false)
      }
    }

    if (!user && !trie) getUser()
  }, [id])

  const rendeContent = () =>
    user ? (
      <span>{user.first_name + ' ' + user.second_name}</span>
    ) : (
      <>Не удалось загрузить имя</>
    )

  return load ? <Loader /> : rendeContent()
}

export default Author
