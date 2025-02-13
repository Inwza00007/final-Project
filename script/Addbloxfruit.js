const BASE_URL = "https://67a9776f6e9548e44fc3b05c.mockapi.io";

let mode = "CREATE";
let selectedId = -1;

const validateData = (bloxfruitData) => {
  let errors = [];

  if (!bloxfruitData.username) {  // เปลี่ยนจาก 'user' เป็น 'username'
    errors.push("กรุณากรอกชื่อผู้ใช้");
  }
  if (!bloxfruitData.password) {
    errors.push("กรุณากรอกรหัสผ่าน");
  }
  if (!bloxfruitData.idorder) {
    errors.push("กรุณากรอกลำดับ ID");
  }

  return errors;
};

const submitData = async () => {
    let submitButton = document.querySelector("button");
    submitButton.disabled = true;  // ปิดปุ่มระหว่างการส่งข้อมูล

    let userDOM = document.querySelector("input[name=username]");
    let passwordDOM = document.querySelector("input[name=password]");
    let desDOM = document.querySelector("textarea[name=des]");  
    let idorderDOM = document.querySelector("input[name=idorder]");

    let bloxfruitData = {
      idorder: Number(idorderDOM.value),
      username: userDOM.value,  
      password: passwordDOM.value,  
      des: desDOM.value,      
    };

    const errors = validateData(bloxfruitData);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      submitButton.disabled = false;
      return;
    }

    try {
      let response;
      if (mode === "EDIT") {
        console.log(`แก้ไขข้อมูลที่: ${BASE_URL}/bloxfruit/${selectedId}`);
        response = await axios.put(`${BASE_URL}/bloxfruit/${selectedId}`, bloxfruitData);
        alert("แก้ไขข้อมูลเรียบร้อย");
      } else {
        response = await axios.post(`${BASE_URL}/bloxfruit`, bloxfruitData);
        alert("เพิ่มข้อมูลเรียบร้อย");
      }
      console.log("Response:", response.data);
    } catch (error) {
      alert(`มีปัญหาเกิดขึ้น: ${error.response ? error.response.data : error.message}`);
      console.error("Error details:", error);
    } finally {
      
      setTimeout(() => {
        submitButton.disabled = false;
      }, 1000);
    }
  };

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    mode = "EDIT";
    selectedId = id;

    let userDOM = document.querySelector("input[name=username]");
    let passwordDOM = document.querySelector("input[name=password]");
    let desDOM = document.querySelector("textarea[name=des]"); 
    let idorderDOM = document.querySelector("input[name=idorder]");

    try {
      const response = await axios.get(`${BASE_URL}/bloxfruit/${id}`);
      const bloxfruit = response.data;

      console.log("Bloxfruit Data:", bloxfruit);  // ตรวจสอบข้อมูลที่ได้รับจาก API

      userDOM.value = bloxfruit.username;  // ตรวจสอบว่าใช้ 'username' จาก API
      passwordDOM.value = bloxfruit.password;
      desDOM.value = bloxfruit.des;
      idorderDOM.value = bloxfruit.idorder;
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
