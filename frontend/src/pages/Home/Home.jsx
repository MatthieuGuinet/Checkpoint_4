import Header from "../../components/Header/Header";
import MyBooks from "../../components/MyBooks/MyBooks";
import AddBookButton from "../../components/AddBookButton/AddBookButton";
import AddBook from "../../components/AddBook/AddBook";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <div className="desktop-position">
        <MyBooks />
        <AddBook desktop />
      </div>
      <AddBookButton />
    </div>
  );
}
