'use client';

import { FC, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { getCode } from 'country-list';
import Flag from 'react-world-flags';
import Timer from '@/components/common/Timer';
import { useAuth } from '@/context/AuthProvider';
import AuthPopup from '@/components/popups/AuthPopup';
import { toast } from 'react-toastify';
import { GP } from '@/types/GP';
import { useRouter } from 'next/navigation';


const BetCard: FC = () => {
    const [grandPrix, setGrandPrix] = useState<GP>({
        id: 0,
        name: '',
        round: 0,
        track: {
            id: '',
            trackName: '',
            countryName: '',
            pictureCountry: '',
            pictureTrack: '',
        },
        dateTime: '',
        pilotes: [],
    });

    const [countryCode, setCountryCode] = useState<string>('');
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const { isAuthenticated } = useAuth();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const router = useRouter();

    const togglePopup = () => {
        setIsPopupVisible((prev) => !prev);
    };

    const bettingHandler = () => {
        if (isAuthenticated) {
            console.log('Betting...');
            router.push('/vote');
        } else {
            toast.error('Please login to place a bet');
            togglePopup();
        }
    };

    const getGrandPrixData = async () => {
        //fetch api
        setGrandPrix({
            id: 1,
            name: "Monaco Grand Prix",
            round: 3,
            track: {
                id: "track_01",
                trackName: "Circuit de Monaco",
                countryName: "Monaco",
                pictureCountry: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/1280px-Flag_of_Monaco.svg.png",
                pictureTrack: "https://i.imgur.com/vz3pcms.jpeg",
            },
            dateTime: "2025-05-25T14:00:00Z",
            pilotes: [
                {
                    id: "pilote_01",
                    name: "Max Verstappen",
                    picture: "https://example.com/pilotes/verstappen.jpg",
                    trigram: "VER",
                    ecurie: {
                        id: "ecurie_01",
                        name: "Red Bull Racing",
                        logo: "https://example.com/logos/redbull.png",
                        color: "#0600EF",
                        pilotes: [],
                    },
                },
                {
                    id: "pilote_02",
                    name: "Lewis Hamilton",
                    picture: "https://example.com/pilotes/hamilton.jpg",
                    trigram: "HAM",
                    ecurie: {
                        id: "ecurie_02",
                        name: "Mercedes",
                        logo: "https://example.com/logos/mercedes.png",
                        color: "#00D2BE",
                        pilotes: [],
                    },
                },
                {
                    id: "pilote_03",
                    name: "Charles Leclerc",
                    picture: "https://example.com/pilotes/leclerc.jpg",
                    trigram: "LEC",
                    ecurie: {
                        id: "ecurie_03",
                        name: "Ferrari",
                        logo: "https://example.com/logos/ferrari.png",
                        color: "#DC0000",
                        pilotes: [],
                    },
                },
            ],
            classement: [
                {
                    id: "classement_01",
                    race: {} as GP,
                    pilote: {
                        id: "pilote_01",
                        name: "Max Verstappen",
                        picture: "https://example.com/pilotes/verstappen.jpg",
                        trigram: "VER",
                        ecurie: {
                            id: "ecurie_01",
                            name: "Red Bull Racing",
                            logo: "https://example.com/logos/redbull.png",
                            color: "#0600EF",
                            pilotes: [],
                        },
                    },
                    isDNF: false,
                    position: 1,
                },
                {
                    id: "classement_02",
                    race: {} as GP,
                    pilote: {
                        id: "pilote_02",
                        name: "Lewis Hamilton",
                        picture: "https://example.com/pilotes/hamilton.jpg",
                        trigram: "HAM",
                        ecurie: {
                            id: "ecurie_02",
                            name: "Mercedes",
                            logo: "https://example.com/logos/mercedes.png",
                            color: "#00D2BE",
                            pilotes: [],
                        },
                    },
                    isDNF: false,
                    position: 2,
                },
                {
                    id: "classement_03",
                    race: {} as GP,
                    pilote: {
                        id: "pilote_03",
                        name: "Charles Leclerc",
                        picture: "https://example.com/pilotes/leclerc.jpg",
                        trigram: "LEC",
                        ecurie: {
                            id: "ecurie_03",
                            name: "Ferrari",
                            logo: "https://example.com/logos/ferrari.png",
                            color: "#DC0000",
                            pilotes: [],
                        },
                    },
                    isDNF: false,
                    position: 3,
                },
            ],
        });
    };

    const getCountryCode = (countryName: string) => {
        const code = getCode(countryName);
        return code ? code.toLowerCase() : 'unknown';
    };

    const getDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return date;
    }

    useEffect(() => {
        getGrandPrixData();
    }, []);

    useEffect(() => {
        setCountryCode(getCountryCode(grandPrix.track.countryName));
        setDateTime(getDateTime(grandPrix.dateTime));
    }, [grandPrix]);

    return (
        <div className="bet-card w-90">
            <div className="grand-prix-info flex justify-between">
                <div>
                    <div className="flex">
                        <Flag code={countryCode} className="w-8 h-8 mr-2" />
                        <h1>{grandPrix.track.countryName}</h1>
                    </div>
                    <p>{grandPrix.name}</p>
                </div>
                {grandPrix.track.pictureTrack ? (
                    <img
                        src={grandPrix.track.pictureTrack}
                        alt="circuit"
                        className="w-20 h-20"
                    />
                ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                    </div>
                )}
            </div>
            <Timer dateCircuit={dateTime} />
            <Button onClick={bettingHandler}>Bet</Button>
            <AuthPopup isVisible={isPopupVisible} togglePopup={togglePopup} />
        </div>
    );
};

export default BetCard;