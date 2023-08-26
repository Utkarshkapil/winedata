import React, { useEffect, useState } from 'react';
import { mean, median, mode, wineData as data } from '../../utils';
import './WineDataStatistics.css';

interface WineData {
    Alcohol: number;
    'Malic Acid': number;
    Ash: number;
    'Alcalinity of ash': number;
    Magnesium: number;
    'Total phenols': number;
    Flavanoids: number;
    'Nonflavanoid phenols': number;
    Proanthocyanins: string;
    'Color intensity': number;
    Hue: number;
    'OD280/OD315 of diluted wines': number;
    Unknown: number;
    Gamma: number;
}

const WineDataStatistics = () => {
    const [statistics, setStatistics] = useState<{ [key: string]: number[] }>({});
    const [gammaStatistics, setGammaStatistics] = useState<{ [key: string]: number[] }>({});

    useEffect(() => {
        const wineData: WineData[] = data.map(d => ({
            ...d,
            'OD280/OD315 of diluted wines': parseFloat(String(d['OD280/OD315 of diluted wines'])),
            'Ash': parseFloat(String(d['Ash'])),
            'Nonflavanoid phenols': parseFloat(String(d['Nonflavanoid phenols'])),
            'Color intensity': parseFloat(String(d['Color intensity'])),
            'Flavanoids': parseFloat(String(d['Flavanoids'])),
            'Gamma': (parseFloat(String(d.Ash)) * parseFloat(String(d.Hue))) / parseFloat(String(d.Magnesium))
        }));

        const classes = Array.from(new Set(wineData.map((data) => data.Alcohol)));
        const stats: { [key: string]: number[] } = {};
        const gammaStats: { [key: string]: number[] } = {}; 

        classes.forEach((cls) => {
            const flavanoids = wineData
                .filter((data) => data.Alcohol === cls)
                .map((data) => data.Flavanoids);
            stats[`Class ${cls}`] = [mean(flavanoids), median(flavanoids), mode(flavanoids)];

            const gammaValues = wineData
                .filter((data) => data.Alcohol === cls)
                .map((data) => data.Gamma);
            gammaStats[`Class ${cls}`] = [mean(gammaValues), median(gammaValues), mode(gammaValues)]; 
        });

        setStatistics(stats);
        setGammaStatistics(gammaStats); 
    }, []);

    return (
        <div className="container">
            <h1>Wine Data Statistics</h1>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {Object.keys(statistics).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Flavanoids Mean</td>
                        {Object.values(statistics).map((value, index) => (
                            <td key={index}>{value[0]}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoids Median</td>
                        {Object.values(statistics).map((value, index) => (
                            <td key={index}>{value[1]}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Flavanoids Mode</td>
                        {Object.values(statistics).map((value, index) => (
                            <td key={index}>{value[2]}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <h2>Gamma Statistics</h2>
            <table>
                <thead>
                    <tr>
                        <th>Measure</th>
                        {Object.keys(gammaStatistics).map((key) => (
                            <th key={key}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Gamma Mean</td>
                        {Object.values(gammaStatistics).map((value, index) => (
                            <td key={index}>{value[0]}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gamma Median</td>
                        {Object.values(gammaStatistics).map((value, index) => (
                            <td key={index}>{value[1]}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Gamma Mode</td>
                        {Object.values(gammaStatistics).map((value, index) => (
                            <td key={index}>{value[2]}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WineDataStatistics;