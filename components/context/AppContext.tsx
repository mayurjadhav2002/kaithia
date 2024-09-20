"use client";
import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from "react";

interface User {
	_id: string;
	first_name: string;
	last_name: string;
	username: string;
	userId: string;
	avatar: string;
	password_reset?: string;
	password_reset_token?: string;
	date?: string;
	createdAt?: string;
	updatedAt?: string;
}

interface Permissions {
	groupCreation: boolean;
	groupAdding: boolean;
}

interface Profile {
	_id: string;
	userId: string;
	bio: string;
	skills: string[];
	links: string[];
	permissions: Permissions;
	created_on: string;
	createdAt: string;
	updatedAt: string;
}

interface UserContextType {
	userId: string | null;
	userData: User | null;
	profileData: Profile | null;
	updateUserData: (data: {user: User; profile: Profile}) => void;
	GetGroups: () => Promise<HandleGroupsResponse | undefined>;
	groups: Group[];
	setGroupId: (groupId: string | null) => void;
	groupId: string | null;
}

export interface Group {
	id: string;
	name: string;
	description: string;
	created_by: string;
	created_on: string; // ISO 8601 date string
  }
  
  interface HandleGroupsResponse {
	success: boolean;
	groups: Group[];
  }
  

const UserContext = createContext<UserContextType | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({children}: AppProviderProps) => {
	const [userId, setUserId] = useState<string | null>(null);
	const [userData, setUserData] = useState<User | null>(null);
	const [profileData, setProfileData] = useState<Profile | null>(null);
	const [groups, setGroups] = useState<Group[]>([]);
	const [groupId, setGroupId] = useState<string | null>(null);

	const updateUserData = (data: {user: User; profile: Profile}) => {
		setUserId(data.user.userId);
		setUserData(data.user);
		setProfileData(data.profile);
	};

	useEffect(() => {
		if (!userId ) {
			const {user} = {user: {username: "Cjname11", id: "Cjname11"}};

			if (1) {
				const username = user.username || user.id;
			
				console.log("Username:", username);

				fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({username: username}),
				})
					.then((response) => response.json())
					.then(({user, profile}) => {
						console.log("Data received:", {user, profile});
						updateUserData({user, profile});
						setUserId(user.userId);
					})
					.catch((error) => console.error("Error:", error));
			}
		}
	}, [userId]);

	const GetGroups =  async (): Promise<HandleGroupsResponse | undefined> => {
		try {
			if (groups && groups.length > 0) {
				return { success: true, groups };
			}
			const groupsFromStorage = localStorage.getItem("groups");
			if (groupsFromStorage) {
				const parsedGroups = JSON.parse(groupsFromStorage);
				setGroups(parsedGroups);
				return parsedGroups;
			}

			if (userData && userData._id) {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getGroups`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							userId: userData._id,
						}),
					}
				);

				if (response.ok) {
					const data = await response.json();
					const {groups} = data;

					if (groups && groups.length > 0) {
						localStorage.setItem("groups", JSON.stringify(groups));
						setGroups(groups);
						return groups;
					} else {
						console.warn("No groups found for this user.");
						return {success:false, groups: []}
					}
				} else {
					console.error(
						"Failed to fetch groups. Server returned an error."
					);
				}
			} else {
				console.warn("User data is missing or incomplete.");
			}
		} catch (error) {
			console.error("Error fetching groups:", error);
			return {success:false, groups: []}
		}
	};

	return (
		<UserContext.Provider
			value={{userId, userData, profileData, updateUserData, GetGroups, setGroupId, groups, groupId}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within an AppProvider");
	}
	return context;
};
