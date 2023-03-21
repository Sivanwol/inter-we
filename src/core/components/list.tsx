import { Container, Card, Row, Table, Col, Tooltip, Modal, Text } from "@nextui-org/react"
import { FC, useState, useEffect } from "react"
import { IconButton } from "./utils/IconButton"
import { BiAddToQueue } from "react-icons/bi"
import { RiDeleteBin2Line } from "react-icons/ri"
import { Person } from "../data/person"
import { Book } from "../data/book"
import { ListItem } from "../data/list-item"
import AddDialog from "./addDialog"

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
  const [list] = useState<ListItem[]>([])
  const [persons, setPersons] = useState<Person[]>([])
  const [books, setBooks] = useState<Book[]>([])
  const [showAddDialog, setShowAddDialog] = useState(false)
  useEffect(() => {
    const load = async () => {
      if (persons.length === 0 || books.length === 0) {
        setBooks(await loadBooks(API_URI))
        setPersons(await loadPersons(API_URI))
      }
    }
    load().catch((err) => console.error(err))
  }, [API_URI, persons, setPersons, books, setBooks])
  return (
    <Container>
      <Card>
        <Card.Body>
          <Row justify="center" align="center">
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
                <Table.Row key="1">
                  <Table.Cell>Tony Reichert</Table.Cell>
                  <Table.Cell>CEO</Table.Cell>
                  <Table.Cell>
                    <Row justify="center" align="center">
                      <Col css={{ d: "flex" }}>
                        <Tooltip content="Details">
                          <IconButton onClick={() => console.log("View user")}>
                            <BiAddToQueue />
                          </IconButton>
                        </Tooltip>
                      </Col>
                      <Col css={{ d: "flex" }}>
                        <Tooltip
                          content="Delete user"
                          color="error"
                          onClick={() => console.log("Delete user")}
                        >
                          <IconButton>
                            <RiDeleteBin2Line />
                          </IconButton>
                        </Tooltip>
                      </Col>
                    </Row>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Row>
        </Card.Body>
      </Card>

      <Modal closeButton aria-labelledby="modal-title" open={showAddDialog}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Add New item to List
          </Text>
        </Modal.Header>
        <Modal.Body>
          <AddDialog persons={persons} books={books} />
        </Modal.Body>
      </Modal>
    </Container>
  )
}
export default ListView
