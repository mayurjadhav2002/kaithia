import React, {FC, ReactNode} from "react";

const Layout: FC<{children: ReactNode}> = ({children}) => {
	return <div className='h-[calc(100%-4rem)]'>{children}</div>
};

export default Layout;
