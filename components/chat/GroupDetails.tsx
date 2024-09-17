"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Group, useUser } from "../context/AppContext";

const GroupDetails = () => {
	const { GetGroups } = useUser();
	const [groups, setGroups] = useState<Group[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchGroups = async () => {
			const response = await GetGroups();
			if (response?.success) {
				setGroups(response.groups);
			} else {
				console.error("Failed to fetch groups");
			}
			setLoading(false);
		};

		fetchGroups();
	}, [GetGroups]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{groups.length > 0 ? (
				groups.map((group) => (
					<Link
						key={group.id}
						href={`/chat/${group.id}`}
						className="w-full px-3 py-2 flex items-start gap-3 overflow-hidden active:bg-violet-50 transition-all duration-300"
					>
						<img className="w-12 h-12 rounded-lg" src="/avatar.jpg" alt={`${group.name} Avatar`} />
						<div className="w-full">
							<p className="font-medium text-md">{group.name}</p>
							<div className="w-full flex justify-between items-center">
								<span className="text-xs text-gray-600">
									{group.description}
								</span>
								<span className="text-xs text-gray-600">
									{new Date(group.created_on).toLocaleTimeString()}
								</span>
							</div>
						</div>
					</Link>
				))
			) : (
				<p>No groups found.</p>
			)}
		</div>
	);
};

export default GroupDetails;
