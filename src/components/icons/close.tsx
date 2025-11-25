interface CloseIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const CloseIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: CloseIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M7.75732 16.2427L16.2426 7.75739M16.2426 16.2427L7.75732 7.75739" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
