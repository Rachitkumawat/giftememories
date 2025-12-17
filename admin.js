// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 🔐 Same Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDxY9oJwfgJkSe520f6mPgrOX3O6s7lTqM",
  authDomain: "gift-e-memories.firebaseapp.com",
  projectId: "gift-e-memories",
  storageBucket: "gift-e-memories.firebasestorage.app",
  messagingSenderId: "760979484287",
  appId: "1:760979484287:web:c33d7e7f216c4f7d7ad94a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadOrders() {

  const snapshot = await getDocs(collection(db, "orders"));
      const table = document.getElementById("ordersTable");
      table.innerHTML = "";

      snapshot.forEach(orderDoc => {
        const data = orderDoc.data();
        const row = `
          <tr>
            <td>${data.orderId}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.address}</td>
            <td>${data.payment}</td>
            <td><b>${data.status}</b></td>
            <td>
              <button onclick="updateStatus('${orderDoc.id}', 'Shipped')">Shipped</button>
              <button onclick="updateStatus('${orderDoc.id}', 'Delivered')">Delivered</button>
            </td>
          </tr>
        `;
        table.innerHTML += row;
      });
    }

    window.updateStatus = async function (docId, newStatus) {
      const orderRef = doc(db, "orders", docId);
      await updateDoc(orderRef, { status: newStatus });
      alert("Order status updated to " + newStatus);
      loadOrders(); // Refresh table
    };

    loadOrders();