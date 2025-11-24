interface SmileyIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const SmileyIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: SmileyIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M16.5834 14.0833L16.5042 14.2958C16.1606 15.2127 15.5451 16.0029 14.7402 16.5606C13.9353 17.1183 12.9793 17.4169 12.0001 17.4166C11.0208 17.4169 10.0648 17.1183 9.25993 16.5606C8.45502 16.0029 7.83958 15.2127 7.49591 14.2958L7.41675 14.0833M9 9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9C7 8.44772 7.44772 8 8 8C8.55228 8 9 8.44772 9 9ZM17 9C17 9.55228 16.5523 10 16 10C15.4477 10 15 9.55228 15 9C15 8.44772 15.4477 8 16 8C16.5523 8 17 8.44772 17 9ZM22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
