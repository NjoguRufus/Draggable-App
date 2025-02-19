import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const saveItemOrder = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send("Only POST requests allowed.");
    return; // ✅ Explicitly return to avoid TypeScript error
  }

  try {
    const { items } = req.body;
    await db.collection("itemOrders").add({
      items,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Received data:", items);
    res.status(200).json({ success: true, message: "Order saved successfully!" });
    return; // ✅ Explicitly return after sending response
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return; // ✅ Ensure all paths return
  }
});
