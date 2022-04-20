const { Book } = require("../model/Book");

// 모든 책 가져오는 함수 만들고, 다른곳에서 쓸 수 있게 exports로 내보내기
const getAllBooks = async (req, res) => {
  // 이 경로는 모든 책을 제공합니다
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  // 유효성 검사
  if (!books) {
    // 찾는 책이 없으면 실행
    return res.status(404).json({ message: "검색된 제품이 없습니다." });
  }
  // 찾는 책이 있으면 보여주기
  return res.status(200).json({ books });
};

// 책 찾기 (해당 책 고유 id에 접속하면 그 책을 보여줌)
const getById = async (req, res) => {
  const id = req.params.bookId;
  let book;

  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }

  // 유효성 검사
  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없습니다." });
  }
  return res.status(200).json({ book });
};

// 새로운 책 추가하기
const addBook = async (req, res) => {
  // 프론트에서 요청 받은 name과 ~ available들을 호출 할 수 있도록 받고
  let { name, author, description, price, available, image } = req.body;

  let book;
  try {
    // 새로운 Obj을 만들어 사용자가 입력한 책 추가하기
    book = new Book({
      // ES6 문법임 -> name: name 이거랑 같음
      name,
      author,
      description,
      price,
      available,
      image,
    });
    await book.save(); // 새로운 책 추가후 데이터베이스에 저장
  } catch (err) {
    console.log(err);
  }

  // 유효성 검사
  if (!book) {
    // 제품이 책이 아니면
    return res.status(500).json({ message: "추가할 수 없음." });
  }
  // 제품이 책이면 책 추가하기
  return res.status(201).json({ book });
};

// 책 업데이트
const updateBook = async (req, res) => {
  let { name, author, description, price, available, image } = req.body;
  const id = req.params.updateId;

  let book;

  try {
    // 해당 책의 id값을 찾아서 모든 정보 업데이트
    book = await Book.findByIdAndUpdate(id, {
      // ES6 문법임 -> name: name 이거랑 같음
      name,
      author,
      description,
      price,
      available,
      image,
    });
    // 업데이트 한거 데이터베이스에 저장
    book = await book.save();
  } catch (err) {
    console.log(err);
  }

  // 유효성 검사
  if (!book) {
    return res
      .status(404)
      .json({ message: "ID를 찾을 수 없어 업데이트할 수 없음." });
  }
  return res.status(201).json({ book });
};

// 책 삭제
const deleteBook = async (req, res) => {
  const id = req.params.deleteId; //
  let book;

  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  // 유효성 검사
  if (!book) {
    return res
      .status(404)
      .json({ message: "ID를 찾을 수 없어 삭제할 수 없음." });
  }
  return res.status(200).json({ message: "삭제가 완료되었습니다!" });
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
