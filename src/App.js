import {
	useEffect,
	useState
} from 'react';

// import from material/ui
import {
	Box
} from '@material-ui/core';

// components
import Navbar from './Components/Navbar';
import BreadCrumb from './Components/BreadCrumb';
import Image from './Components/Image';
import SnackBar from './Components/SnackBar';

import {
	getImages
} from './Services/api';

// CSS styles for the footer
const footerStyle = {
	padding: '10px',
	textAlign: 'center',
	backgroundColor: '#4a90e2', // Background color
	color: 'white', // Text color
	position: 'relative',
	bottom: 0,
	width: '100%',
	transition: 'background-color 0.3s ease', // Smooth transition for background color
};

const footerLinkStyle = {
	color: '#ffcc00', // Link color
	textDecoration: 'none', // Remove underline
	transition: 'color 0.3s ease, transform 0.3s ease', // Transition for hover effect
};

const footerLinkHoverStyle = {
	color: '#ffffff', // Change link color on hover
	transform: 'scale(1.1)', // Slightly enlarge link on hover
};

// Keyframe animation for fade-in effect
const fadeInAnimation = {
	animation: 'fadeIn 0.5s ease-in',
};

// Global styles for keyframes (using a style tag)
const globalStyles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const App = () => {
	const [data, setData] = useState([]);
	const [count, setCount] = useState(10);
	const [text, setText] = useState("mountains");
	const [open, toggleSnack] = useState(false);

	useEffect(() => {
		if (count < 3 || count > 200) {
			toggleSnack(true);
			return;
		}

		toggleSnack(false);

		getImages(text, count).then(response => {
			setData(response.data.hits);
		});
	}, [text, count]);

	const onTextChange = (text) => {
		setText(text);
	};

	const onCountChange = (count) => {
		setCount(count);
	};

	return (
		<Box>
			<Navbar />
			<BreadCrumb onTextChange={onTextChange} onCountChange={onCountChange} />
			<Image data={data} />
			<SnackBar open={open} toggleSnack={toggleSnack} />

			{/* Inject global styles for animations */}
			<style>{globalStyles}</style>

			{/* Footer Component */}
			<footer style={{ ...footerStyle, ...fadeInAnimation }}>
				<h3>
					<a
						href="mailto:your-sahilbambarkar007@gmail.com"
						style={footerLinkStyle}
						onMouseOver={(e) => e.currentTarget.style = footerLinkHoverStyle}
						onMouseOut={(e) => e.currentTarget.style = footerLinkStyle}
					>
						MADE WITH ❤
					</a>
				</h3>
			</footer>
		</Box>
	);
}

export default App;