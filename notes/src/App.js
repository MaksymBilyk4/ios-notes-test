import './App.css';
import {Tabs} from "antd";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "./utils/db";
import {useState} from "react";
import Workspace from "./components/Workspace/Workspace";
const { TabPane } = Tabs;

const App = () => {
  const notes = useLiveQuery(() => db.note.toArray());

  const [title, setTitle] = useState("Title");
  const [text, setText] = useState("Title");
  const [date, setDate] = useState("");

  const dateNow = new Date();

  // const day = dateNow.toLocaleDateString("en-US", {day: "numeric"});
  // const month = dateNow.toLocaleDateString("en-US", {month: "long"});
  // const year = dateNow.getFullYear();
  // const hours = dateNow.getHours();
  // const time = dateNow.getMinutes();

  const onDateChange = (date, dateString) => {setDate(dateString)}

  const addNote = () => db.note.add({
      title,
      text,
      date
  });


  return (
    <>
        <Tabs size={"large"} tabPosition={"left"}>
            {notes?.map((note) => {
              return(
                <TabPane tab={note?.title} key={note?.id}>
                    <Workspace title={note?.title} id={note?.id} text={note?.text} date={note?.date}/>
                </TabPane>
              )
            })}
        </Tabs>

        {/*<Form onFinish={addNote}>*/}
        {/*    <Form.Item label={"title"}>*/}
        {/*        <Input onChange={(e) => setTitle(e.target.value)}/>*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item label={"text"}>*/}
        {/*        <Input onChange={(e) => setText(e.target.value)}/>*/}
        {/*    </Form.Item>*/}
        {/*    <Form.Item label={"date"}>*/}
        {/*        <DatePicker onChange={onDateChange}/>*/}
        {/*    </Form.Item>*/}

        {/*    <Button htmlType="submit">Submit</Button>*/}
        {/*</Form>*/}
    </>
  );
}

export default App;
