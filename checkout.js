// // checkout.js
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// // 🔐 Replace this with your own Firebase config:
// const firebaseConfig = {
//   apiKey: "AIzaSyDxY9oJwfgJkSe520f6mPgrOX3O6s7lTqM",
//   authDomain: "gift-e-memories.firebaseapp.com",
//   projectId: "gift-e-memories",
//   storageBucket: "gift-e-memories.firebasestorage.app",
//   messagingSenderId: "760979484287",
//   appId: "1:760979484287:web:c33d7e7f216c4f7d7ad94a"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// document.getElementById('orderForm').addEventListener('submit', async function(e) {
//   e.preventDefault();

//   const orderId = this.orderId.value;
//   const name = this.name.value;
//   const email = this.email.value;
//   const address = this.address.value;
//   const payment = this.payment.value;

//   //const orderId = "ORD-" + Date.now();

//   try {
//     await addDoc(collection(db, "orders"), {
//       orderId,
//       name,
//       email,
//       address,
//       payment,
//       date: new Date().toISOString()
//     });

//     alert("Order placed and saved to Firebase!" + orderId);
//     localStorage.removeItem('cart');
//     window.location.href = 'index.html',"track-order.html?orderId=" + orderId;
//   } catch (error) {
//     console.error("Firebase error:", error);
//     alert("Failed to save order.");
//   }
// });

// //(2)

// document.getElementById("orderForm").addEventListener("submit", async function(e) {
//   e.preventDefault();

//   // Form values
//   const orderId = document.getElementById("orderId").value;
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const address = document.getElementById("address").value;
//   const payment = document.getElementById("payment").value;

//   // Cart items (localStorage se le rahe hain)
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];

//   // Order data
//   const orderData = {
//     orderId,
//     name,
//     email,
//     address,
//     payment,
//     items: cart
//   };

//   try {
//     const res = await fetch("http://localhost:3000/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData)
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert(`✅ Order placed successfully!\nYour Order ID: ${data.orderId}`);
//       localStorage.removeItem("cart");
//       window.location.href = "index.html";
//     } else {
//       alert("❌ Failed to place order.");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     alert("⚠️ Something went wrong. Try again.");
//   }
// });

