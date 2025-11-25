interface EditIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const EditIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: EditIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M14.8284 6.34316L17.6569 9.17158M18.2226 4.08041L19.9196 5.77747C20.232 6.08989 20.232 6.59642 19.9196 6.90884L8.46449 18.364L4.92896 19.0711L5.63606 15.5355L17.0912 4.08041C17.4036 3.76799 17.9101 3.76799 18.2226 4.08041Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
