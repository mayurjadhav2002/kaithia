"use client";

import BottomTabs from "@/components/BottomTabs";
import {AppProvider} from "@/components/context/AppContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AppProvider>
			<div className='relative lg:w-2/4 lg:mx-auto w-full md:w-2/4 md:mx-auto xl:w-1/4 xl:mx-auto'>
				<div className='mb-16'>{children}</div>
			</div>
			<BottomTabs />
		</AppProvider>
	);
}
