const BASE_URL = "https://67a9776f6e9548e44fc3b05c.mockapi.io";

let mode = "CREATE";
let selectedId = -1;

const validateData = (internetData) => {
  event.preventDefault()
  let errors = [];

  if (!internetData.user) {
    errors.push("กรุณากรอกชื่อผู้ใช้หรือID");
  }
  if (!internetData.password) {
    errors.push("กรุณากรอกรหัสผ่าน");
  }
  if (!internetData.hour) {
    errors.push("กรุณากรอกชั่วโมงหรือเวลา");
  }

  return errors;
};

const submitData = async () => {
  let userDOM = document.querySelector("input[name=user]");
  let passwordDOM = document.querySelector("input[name=password]");
  let hourDOM = document.querySelector("input[name=hour]");

  let internetData = {
    user: userDOM.value,
    password: passwordDOM.value, // แปลงเป็นตัวเลข
    hour: Number(hourDOM.value),     // แปลงเป็นตัวเลข
  };

  const errors = validateData(internetData);
  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;  
  }

  try {
    let response;
    if (mode === "EDIT") {
      console.log(`แก้ไขข้อมูลที่: ${BASE_URL}/internet/${selectedId}`);
      response = await axios.put(`${BASE_URL}/internet/${selectedId}`, internetData);
      alert("แก้ไขข้อมูลเรียบร้อย");
    } else {
      
      response = await axios.post(`${BASE_URL}/internet`, internetData);
      alert("เพิ่มข้อมูลเรียบร้อย");
    }
    console.log("Response:", response.data);
  } catch (error) {
    alert(`มีปัญหาเกิดขึ้น: ${error.response ? error.response.data : error.message}`);
    console.error("Error details:", error);
  }
};

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    mode = "EDIT";
    selectedId = id;

    let userDOM = document.querySelector("input[name=user]");
    let passwordDOM = document.querySelector("input[name=password]");
    let hourDOM = document.querySelector("input[name=hour]");


    try {
      const response = await axios.get(`${BASE_URL}/internet/${id}`);
      const internet = response.data;

      userDOM.value = internet.user;
      passwordDOM.value = internet.password;
      hourDOM.value = internet.hour;
    } catch (error) {
      console.error("error", error);
    }
  }
};
