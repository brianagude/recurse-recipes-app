interface OutboundIconProps {
	width?: number;
	height?: number;
	color?: string;
}

export const OutboundIcon = ({
	width = 24,
	height = 24,
	color = "#1d1c16",
}: OutboundIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
  <path d="M9 7H8.4C7.07 7 6 8.07 6 9.4V15.6C6 16.93 7.07 18 8.4 18H14.6C15.93 18 17 16.93 17 15.6V15M10 14L18 6M18 6H14M18 6V10" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
	);
};
