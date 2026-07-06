import { TaskDetail } from "@/components/index"


async function page(props) {
    const user = await props.params
  return (
    <div>Hello {user.id}</div>
  )
}

export default page
