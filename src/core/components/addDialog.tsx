import { FC, useState } from "react"
import { Book } from "../data/book"
import { ListItem } from "../data/list-item"
import { Person } from "../data/person"

const AddDialog: FC<{
  books: Book[]
  persons: Person[]
}> = ({ books, persons }) => {
  const [list, setList] = useState<ListItem[]>([])
  return <></>
}

export default AddDialog
