'use client';

import { Team } from '@/components/SiderLayout';
import { getAllTeams } from '@/libs/getAllTeams';
import { getMe } from '@/libs/getMe';
import { Skeleton } from 'antd';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface User {
    username: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    religion: string;
    food_allergy: string;
    health_issue: string;
    age: number;
}

export default function Profile() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User>();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, teamsData] = await Promise.all([
                    getMe(session?.user.token as string),
                    getAllTeams(session?.user.token as string)
                ]);
                setUser(userData);
                setTeams(teamsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user.token) {
            fetchData();
        }
    }, [session?.user.token]);

    if (loading) {
        return (
            <div className="flex flex-col p-4 max-w-lg mx-auto">
                <div className="flex flex-row justify-around items-center mb-6">
                    <Skeleton.Avatar active size={160} className="mb-2" />
                    <div className="flex flex-col items-center">
                        <Skeleton.Input active size="large" style={{ width: 200 }} />
                        <Skeleton.Input active size="large" style={{ width: 200 }} />
                    </div>
                </div>

                <Skeleton.Button active block className="mb-6" />

                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <Skeleton active paragraph={{ rows: 4 }} />
                </div>

                <div>
                    <Skeleton.Input active size="small" style={{ width: 100, marginBottom: 12 }} />
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <Skeleton.Avatar active size={48} className="mb-2" />
                                <Skeleton.Input active size="small" style={{ width: 60 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-4 max-w-lg mx-auto">
            <div className="flex flex-row justify-around items-center mb-6">
                <div className="w-40 h-40 relative mb-2">
                    <Image
                        src="/images/cat.jpg"
                        alt="Profile"
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-7xl font-bold">{user?.name}</p>
                    <p className="text-7xl font-bold">{user?.surname}</p>
                </div>
            </div>

            <button className="w-full bg-gray-200 rounded-lg py-2 mb-6 hover:bg-gray-300">
                Get Plus+
            </button>

            <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="mb-4">
                    <p className="text-lg mb-2">Religion:</p>
                    <div className="bg-gray-400 text-white py-1 px-3 rounded">
                        {user?.religion ? user.religion : 'None'}
                    </div>
                </div>

                <div>
                    <p className="text-lg mb-2">Food Allergy:</p>
                    <div className="flex flex-col gap-2">
                        <div className="bg-gray-400 text-white py-1 px-3 rounded">
                            {user?.food_allergy ? user.food_allergy : 'None'}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-lg mb-3">People:</p>
                <div className="grid grid-cols-4 gap-4">
                    {teams.map((team) => (
                        <div key={team.team_id} className="flex flex-col items-center">
                            <div className="w-12 h-12 relative">
                                <Image
                                    src="/images/cat.jpg"
                                    alt={team.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <p className="text-sm text-center">{team.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}