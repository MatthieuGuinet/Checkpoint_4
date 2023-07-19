import Header from "../../components/Header/Header";
import MyBooks from "../../components/MyBooks/MyBooks";
import AddBookButton from "../../components/AddBookButton/AddBookButton";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <MyBooks />
      <AddBookButton />
    </div>
  );
}
