const BASE_URL = "https://67a9776f6e9548e44fc3b05c.mockapi.io";

window.onload = async () => {
  await loadData();
};

// Function to load and display users as cards
const loadData = async (searchTerm = "") => {
  const response = await axios.get(`${BASE_URL}/bloxfruit`);
  let bloxfruit = response.data;

  if (searchTerm) {
    bloxfruit = bloxfruit.filter(
      (bloxfruit) =>
        String(bloxfruit.username)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        String(bloxfruit.password)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  let bloxfruitHTMLData = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">`;

  for (let i = 0; i < bloxfruit.length; i++) {
    bloxfruitHTMLData += `
      <div class="bg-[#0D0D0D] border-2 border-[#00FFFF] rounded-xl p-4 shadow-[0_0_20px_#FF00FF] hover:shadow-[0_0_30px_#00FFFF] transition-transform transform hover:scale-105">
        <h3 class="text-xl font-bold text-[#39FF14] text-center mb-2">${bloxfruit[i].idorder}</h3>
        <p class="text-sm text-[#FF00FF] text-center">ชื่อ: ${bloxfruit[i].username}</p>
        <p class="text-sm text-[#00FFFF] text-center">รหัส: ${bloxfruit[i].password}</p>
        <p class="text-sm text-[#00FFFF] text-center">คำอธิบาย: ${bloxfruit[i].des}</p>
        <div class="flex justify-center mt-4">
          <button class="px-4 py-2 font-medium text-black bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] rounded-md shadow-[0_0_10px_#FF00FF] hover:shadow-[0_0_20px_#00FFFF] transition-transform transform hover:scale-105" onclick="editUser(${bloxfruit[i].id})">
            Edit <i class="fa-solid fa-pencil"></i>
          </button>
          <button class="ml-2 px-4 py-2 font-medium text-black bg-gradient-to-r from-[#FF3131] to-[#FF00FF] rounded-md shadow-[0_0_10px_#FF3131] hover:shadow-[0_0_20px_#FF00FF] transition-transform transform hover:scale-105" data-id='${bloxfruit[i].id}'>
            Delete <i class="fa-solid fa-eraser"></i>
          </button>
        </div>
      </div>
    `;
  }

  bloxfruitHTMLData += `</div>`;

  let bloxfruitDOM = document.getElementById("bloxfruit");
  bloxfruitDOM.innerHTML = bloxfruitHTMLData;

  let deleteDOMs = document.querySelectorAll("[data-id]");

  deleteDOMs.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const id = event.currentTarget.dataset.id;
      if (confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
        try {
          await axios.delete(`${BASE_URL}/bloxfruit/${id}`);
          loadData();
        } catch (error) {
          console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
        }
      }
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("edited")) {
    await loadData();
  }
};

const editUser = (id) => {
  window.location.href = `./Addbloxfruit.html?id=${id}&edited=true`;
};

const handleSearch = async () => {
  const searchInput = document.getElementById("search").value;
  await loadData(searchInput);
};
