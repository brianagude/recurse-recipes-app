interface DeleteIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const DeleteIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: DeleteIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M7.75739 16.2426L16.2427 7.75736M16.2427 16.2426L7.75739 7.75736M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
