import React, {useState} from 'react'

export default function Calculator() {
    const [screenValue, setScreenValue] = useState('')
    const [result, setResult] = useState(0)
    const [acumulator, setAcumulator] = useState(0)
    const [operated, setOperated] = useState(false)

    //STYLE
    const containerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 300,
        border: '1px solid #222'
    }
    const buttonsStyle = {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
    const screenStyle = {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        background: '#444',
        width: 260
    }
    const operationScreenStyle = {
        fontSize: 25,
        color: '#fff',
        height: 20
    }
    const resultScreenStyle = {
        fontSize: 50,
        color: '#fff'
    }
    const btnStyle = {
        fontSize: 30,
        height: 75,
        width: 75,
        padding: 20,
        background: '#222',
        color: '#fff',
        borderColor: '#222',
        textAlign: 'center',
        outline: 'none'

    }

    //COMPONENTS
    const screen = (oper, res) => {
        return (
            <div style={screenStyle}>
                <span style={operationScreenStyle}>{oper}</span>
                <span style={resultScreenStyle}>{res}</span>
            </div>
        )
    }
    const btn = (label, onClick) => {
        return (
            <button style={btnStyle} onClick={onClick}>{label}</button>
        )
    }

    //FUNCTIONS
    const addScreenDigit = (val) => {
        if ((val === '+' || val === '-' || val === '*' || val === '/') && operated) {
            setOperated(false)
            setScreenValue(result + val)
            return
        } else if (operated) {
            setScreenValue(val)
            setOperated(false)
            return
        } else {
            let lastVal = screenValue[screenValue.length - 1]
            if(lastVal !== val) {
                setScreenValue(screenValue + val)
            }
        }
    }
    const cleanScreen = () => {
        setOperated(false)
        setScreenValue('')
        setResult(0)
        setAcumulator(0)
        return
    }
    const operation = val => {
        if(val === 'bs') {
            let screenVal = screenValue.substring(0, (screenValue.length - 1))
            setScreenValue(screenVal)
            setOperated(false)
            return
        }

        try { //CALC
            const r = eval(screenValue)
            if(screenValue != '') {
                setResult(r)
            } else {
                setResult(0)
            }
            setAcumulator(r)
            setOperated(true)
        } catch {
            setResult('ERRO')
        }
    }

    return(
        <div style={containerStyle}>
            <h3>Calculadora</h3>
            {screen(screenValue, result)}
            <div style={buttonsStyle}>
                {btn('AC', cleanScreen)}
                {btn('(', () => addScreenDigit('('))}
                {btn(')', () => addScreenDigit(')'))}
                {btn('/', () => addScreenDigit('/'))}
                {btn('7', () => addScreenDigit('7'))}
                {btn('8', () => addScreenDigit('8'))}
                {btn('9', () => addScreenDigit('9'))}
                {btn('*', () => addScreenDigit('*'))}
                {btn('4', () => addScreenDigit('4'))}
                {btn('5', () => addScreenDigit('5'))}
                {btn('6', () => addScreenDigit('6'))}
                {btn('-', () => addScreenDigit('-'))}
                {btn('1', () => addScreenDigit('1'))}
                {btn('2', () => addScreenDigit('2'))}
                {btn('3', () => addScreenDigit('3'))}
                {btn('+', () => addScreenDigit('+'))}
                {btn('0', () => addScreenDigit('0'))}
                {btn('.', () => addScreenDigit('.'))}
                {btn('DEL', () => operation('bs'))}
                {btn('=', () => operation('='))}
            </div>
        </div>
    )
}