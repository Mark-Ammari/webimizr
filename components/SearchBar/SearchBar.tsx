import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onFetchAccessibilityReport } from 'store/reducers/lighthouse/accessibilitySlice';
import { onFetchBestPracticesReport } from 'store/reducers/lighthouse/bestPracticesSlice';
import { onFetchPerformanceReport } from 'store/reducers/lighthouse/performanceSlice';
import { onFetchPWAReport } from 'store/reducers/lighthouse/pwaSlice';
import { onFetchSEOReport } from 'store/reducers/lighthouse/seoSlice';

const SearchBar: React.FC = () => {
    const router = useRouter()
    const [url, setURL] = useState("")
    const [select, setSelect] = useState("desktop")

    const enterURLHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setURL(event.target.value)
    }

    const preventEnterKeypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault()
            return false;
        }
    }

    const changeDevicesHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(event.target.value)
    }

    const SubmitAuditHandler = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (url.length > 0) {
            router.push({ query: `url=${url}&emulation=${select}` })
        }
    }
    return (
        <>
            <h1 id='heading'>Local Performance Insights</h1>
            <form id='form-container'>
                <input value={url} onKeyDown={preventEnterKeypressHandler} onChange={enterURLHandler} id='input-field' placeholder='Search URL...' />
                <div id='actions-field'>
                    <select value={select} onChange={changeDevicesHandler} id='dropdown-field'>
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                    </select>
                    <input id='button-field' name='Search' value='Search' type='button' onClick={SubmitAuditHandler} />
                </div>
            </form>
            <style jsx>
                {`#heading {
                    margin: auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primaryColor);
                    font-weight: bold;
                    margin: var(--spacing)
                }
                #form-container {
                    max-width: 900px;
                    margin: auto;
                    padding: var(--spacing);
                    position: relative;
                }
                #input-field {
                    width: 100%;
                    padding: var(--spacing);
                    border-radius: var(--radius);
                    outline: none;
                    border: 1px solid var(--secondaryColor)
                }
                #actions-field {
                    width: 100%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;
                    margin: var(--verticalSpacing) 0
                }
                #dropdown-field {
                    outline: none;
                    background-color: var(--primaryColor);
                    color: #FFF;
                    padding: var(--spacing);
                    border: none;
                    border-radius: var(--radius);
                    margin-right: var(--verticalSpacing)
                }
                #button-field {
                    outline: none;
                    background-color: var(--secondaryColor);
                    color: #FFF;
                    padding: var(--spacing);
                    border: none;
                    height: 37px;
                    cursor: pointer;
                    border-radius: var(--radius)
                }`}
            </style>
        </>

    )
}

export default SearchBar;