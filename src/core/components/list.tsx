import {
  Container,
  Card,
  Row,
  Table,
  Col,
  Tooltip,
  Modal,
  Text,
  Button,
  Spacer,
} from "@nextui-org/react"
import { FC, useState, useEffect } from "react"
import { IconButton } from "./utils/IconButton"
import { BiAddToQueue } from "react-icons/bi"
import { RiDeleteBin2Line } from "react-icons/ri"
import { Person } from "../data/person"
import { Book } from "../data/book"
import { ListItem } from "../data/list-item"
import { useForm } from "react-hook-form"
import React from "react"

const loadPersons = async (API_URI: string) => {
  const uri = `${API_URI}/persons`
  const res = await fetch(uri)
  const data = (await res.json()).data as Person[]
  return data
}
const loadBooks = async (API_URI: string) => {
  const uri = `${API_URI}/books`
  const res = await fetch(uri)
  const data = (await res.json()).data as Book[]
  return data
}
const ListView: FC<{
  API_URI: string
}> = ({ API_URI }) => {
  const [list, setList] = useState<ListItem[]>([])
  const [persons, setPersons] = useState<Person[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      book: "",
      person: "",
    },
  })
  const [, updateState] = React.useState()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [showAddDialog, setShowAddDialog] = useState(false)
  const onSubmit = (data) => {
    const book = books.find((b) => b.id == data.book)
    const person = persons.find((p) => p.id == data.person)
    const pName = `${person?.firstname} ${person?.lastname}`
    const title = book?.title as string
    const obj: ListItem = {
      book_id: data.book,
      person_id: data.person,
      person_name: pName,
      book_title: title,
    }
    list.push(obj)
    setList(list)
    closeHandler()
  }
  const closeHandler = () => {
    setShowAddDialog(false)
    console.log("closed")
  }
  const deleteItemHandler = (idx: number, item: ListItem) => {
    const entity = list[idx]
    list.splice(idx, 1)
    setList(list)
    forceUpdate()
  }
  useEffect(() => {
    const load = async () => {
      if (persons.length === 0 || books.length === 0) {
        setBooks(await loadBooks(API_URI))
        setPersons(await loadPersons(API_URI))
      }
    }
    load().catch((err) => console.error(err))
  }, [API_URI, persons, setPersons, books, setBooks, list])
  return (
    <Container>
      <Card>
        <Card.Body>
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Add new Item" rounded color="secondary" placement="bottom">
                <IconButton onClick={() => setShowAddDialog(true)}>
                  <BiAddToQueue />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
          <Row justify="center" align="center">
            {list.length === 0 ? (
              <Text id="modal-title" size={18}>
                No Data
              </Text>
            ) : (
              <Table
                bordered
                shadow={true}
                aria-label="Example table with static content"
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
              >
                <Table.Header>
                  <Table.Column>Person</Table.Column>
                  <Table.Column>Title</Table.Column>
                  <Table.Column>Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {list.map((item, idx) => (
                    <Table.Row key={`${idx}-${item.book_id}-${item.person_id}`}>
                      <Table.Cell>{item.person_name}</Table.Cell>
                      <Table.Cell>{item.book_title}</Table.Cell>
                      <Table.Cell>
                        <Row justify="center" align="center">
                          <Col css={{ d: "flex" }}>
                            <Tooltip
                              content="Delete Item"
                              color="error"
                              placement="bottom"
                              onClick={() => console.log("Delete user")}
                            >
                              <IconButton onClick={() => deleteItemHandler(idx, item)}>
                                <RiDeleteBin2Line />
                              </IconButton>
                            </Tooltip>
                          </Col>
                        </Row>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Row>
        </Card.Body>
      </Card>

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={showAddDialog}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add New item to List
          </Text>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row gap={1}>
              <Col>
                Person
                <select {...register("person", { required: true })}>
                  {persons.map((entity) => (
                    <option key={entity.id} value={entity.id}>
                      {entity.firstname}, {entity.lastname}
                    </option>
                  ))}
                </select>
                {errors.person?.type === "required" && <p role="alert">person is required</p>}
              </Col>
            </Row>
            <Spacer y={1} />
            <Row gap={1}>
              <Col>
                Book
                <select {...register("book", { required: true })}>
                  {books.map((entity) => (
                    <option key={entity.id} value={entity.id}>
                      {entity.title}
                    </option>
                  ))}
                </select>
                {errors.book?.type === "required" && <p role="alert">book is required</p>}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            <Button auto type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </Container>
  )
}
export default ListView
