import express from "express";
import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

const app = express();

app.use(express.json());

const port = 7000;

app.get("/mahasiswa", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.findMany();
    if (!mahasiswa) throw new Error("Mahasiswa gak ada");
    res.send(mahasiswa);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.get("/mahasiswa/:id", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!mahasiswa) throw new Error("mahasiswa gak ada");

    res.send(mahasiswa);
  } catch (err) {
    res.send({ status: 404, message: err.message });
  }
});

app.post("/mahasiswa/create", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        nim: req.body.nim,
      },
    });
    res.send({ message: "Mahasiswa Berhasil di buat", data: mahasiswa });
  } catch (err) {}
});

app.put("/mahasiswa/update/", async (req, res) => {
  try {
    const mahasiswa = await database.mahasiswa.update({
      where: {
        id: req.body.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        nim: req.body.nim,
      },
    });
    res.send({ message: "Mahasiswa Berhasil di update", data: mahasiswa });
  } catch (err) {}
});

app.delete("/mahasiswa/delete", async (req, res) => {
  await database.mahasiswa.delete({
    where: {
      id: req.body.id,
    },
  });
  res.send({ message: "Mahasiswa Berhasil di hapus" });
});

app.get("/", (req, res) => {
  res.send({ nama: "Maulana Sodiqin" });
});

app.get("/makanan", (req, res) => {
  res.send([
    {
      id: 1,
      nama: "Mie Sedap",
      rasa: "Ayam",
    },
    {
      id: 2,
      nama: "Nasi Goreng",
      rasa: "Nasi Goreng",
    },
  ]);
});

app.get("/minuman", (req, res) => {
  res.send([
    {
      id: 1,
      nama: "Nutrisari",
      rasa: "Jeruk Nipis",
    },
    {
      id: 2,
      nama: "Nutrisari",
      rasa: "Jeruk Peras",
    },
  ]);
});

app.post("/create", (req, res) => {
  res.send({ nama: req.body });
});

app.listen(port, () => {
  console.log(`Aplikasi nya jalan di port ${port}`);
});
