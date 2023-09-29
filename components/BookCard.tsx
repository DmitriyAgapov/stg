const BookCard = ({ book }:any) => {
	const { id, title, release, image, author } = book;
	return (
		<div style={{ width: "150px" }}>
			<img src={image} alt="#" height="100px" />
			<h5>{title}</h5>
			<h5>{release}</h5>
			<h5>{author}</h5>
		</div>
	);
};

export default BookCard;
