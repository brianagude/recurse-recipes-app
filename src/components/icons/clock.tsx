interface ClockIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const ClockIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: ClockIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M12 6V11.8438C12 11.9356 12.0625 12.0156 12.1515 12.0379L16 13M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke={color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
