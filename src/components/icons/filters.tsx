interface FiltersIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const FiltersIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: FiltersIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M6 12H18M4 8H20M8 16H16" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
