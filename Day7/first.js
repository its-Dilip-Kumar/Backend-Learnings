const express=require('express');
const app=express();

const BookStore = [
  { id: 1, name: "Avengers", author: "Ramu" },
  { id: 2, name: "Harry Potter", author: "J.K. Rowling" },
  { id: 3, name: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 4, name: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
  { id: 5, name: "The Alchemist", author: "Paulo Coelho" },
  { id: 6, name: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { id: 7, name: "Atomic Habits", author: "James Clear" },
  { id: 8, name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 9, name: "1984", author: "George Orwell" },
  { id: 10, name: "The Psychology of Money", author: "Morgan Housel" }
];

// app.use("/book/1",(req,res)=>{
//     res.send("this is also a book store")
// })

// app.use("/book",(req,res)=>{
//     res.send("This is Book Store");
// })

app.use(express.json());


app.get("/book",(req,res)=>{
    res.send(BookStore);
}) 

app.get("/book/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const Book=BookStore.find(Info=>Info.id===id);
    res.send(Book);
})

app.post("/book",(req,res)=>{
    BookStore.push(req.body);
    res.send("Data Saved Successfuly"); 
})


app.listen(4000,()=>{
    console.log("Listening at port 4000")
});


