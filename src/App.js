import produce from "immer";
import { useCallback, useRef, useState } from "react";

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", userName: "" });
  const [data, setData] = useState({ array: [], uselessValue: null });

  // input 을 위한 함수
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      // form 상태 변경
      // setForm({
      //   ...form,
      //   [name]: [value],
      // });
      // immer 로 상태관리
      setForm(
        // produce(form, (draft) => {
        produce((draft) => {
          draft[name] = value;
        })
      );
    },
    // [form]
    []
  );

  // submit 을 위한 함수
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        // form 을 활용하여 실제 데이터 생성하기
        // id 는 유저가 입력하는 창이 아님
        id: nextId.current,
        name: form.name,
        userName: form.userName,
      };

      // setData({
      //   // 만들어진 데이터를 data 로 상태 관리
      //   ...data,
      //   array: data.array.concat(info),
      // });

      // immer 사용
      setData(
        // produce(data, (draft) => {
        produce((draft) => {
          draft.array.push(info);
        })
      );

      // input 창은 리셋해줌
      setForm({
        name: "",
        userName: "",
      });
      nextId.current++;
    },
    // [data, form.name, form.userName]
    [form.name, form.userName]
  );

  const onRemove = useCallback(
    (id) => {
      // setData({
      //   ...data,
      //   array: data.array.filter((info) => info.id !== id),
      // });
      // immer 사용
      setData(
        // produce(data, (draft) => {
        produce((draft) => {
          draft.array.splice(
            draft.array.findIndex((info) => info.id === id),
            1
          ); // 아이디가 동일한 항목의 인덱스를 찾아 해당 인덱스에 해당하는 값 1개만 잘라낸다
        })
      );
    },
    // [data]
    []
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="userName"
          placeholder="아이디"
          value={form.userName}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록하기</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.userName} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
