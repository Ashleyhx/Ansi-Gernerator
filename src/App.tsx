import React, {useEffect, useState} from 'react'
import './App.css'
import '@mantine/core/styles.css';
import {
    Button,
    ColorPicker,
    CopyButton,
    MantineColor,
    Stack,
} from '@mantine/core';
import {Flex, Layout} from "antd";
import {Header, Content} from "antd/lib/layout/layout";

const headerStyle: React.CSSProperties = {
    color: '#d9d9e8',
    backgroundColor: '#4618bc',
    fontWeight: 'bold',
    fontSize: 24,

};

const boxStyle: React.CSSProperties = {
    width: '100%',
    height: 320,
    borderRadius: 6,
    border: '2px dotted #a1a0c8',
};

const boxStyleButtons: React.CSSProperties = {
    width: '100%',
    height: 120,
    borderRadius: 6,
    border: '2px dotted #a1a0c8',
};

interface TextStyle {
    fontWeight: 'normal' | 'bold';
    fontStyle: 'normal' | 'italic';
    textDecoration: string[];  // Specify as an array of strings
}

function App() {
    const [textStyle, setTextStyle] = useState<TextStyle>({
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: [],
    });
  const [styleCode, setStyleCode] = useState('');
  const [textCode, setText] = useState('');
  const [textBackground, setTextBackground] = useState('');
  const [color, setColor] = useState('');
    useEffect(() => {
        if (!color) {
            setText('');
            return;
        }
        const cleanColor = color.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setText(`\\x1b[38;2;${r};${g};${b}m `);
    }, [color]);

  const [background, setBackground] = useState('');
    useEffect(() => {
        if (!background) {
            setTextBackground('');
            return;
        }
        const cleanColor = background.replace('rgba(', '').replace(')', '');
        const [r, g, b] = cleanColor.split(',').map((value) => parseInt(value, 10) || 0);
        setTextBackground(`\\x1b[48;2;${r};${g};${b}`);
    }, [background]);

    const toggleStyle = (styleProp: string) => {
        setTextStyle(prevStyle => {
            if (!styleProp) return prevStyle;
            if (styleProp === 'fontWeight') {
                setStyleCode((prevStyle.fontWeight === 'normal' ? ';1' : '') + styleCode);
                return {
                    ...prevStyle,
                    fontWeight: prevStyle.fontWeight === 'normal' ? 'bold' : 'normal'
                };
            } else if (styleProp === 'fontStyle') {
                setStyleCode((prevStyle.fontStyle === 'normal' ? ';3' : '') + styleCode);
                return {
                    ...prevStyle,
                    fontStyle: prevStyle.fontStyle === 'normal' ? 'italic' : 'normal'
                };
            } else if (styleProp === 'underline' || styleProp === 'line-through') {
                if (styleProp === 'underline') {
                    setStyleCode((prevStyle.textDecoration.includes('underline') ? '' : ';4') + styleCode);
                } else {
                    setStyleCode((prevStyle.textDecoration.includes('line-through') ? '' : ';9') + styleCode);
                }
                const currentDecorations = prevStyle.textDecoration;
                const isCurrentlySet = currentDecorations.includes(styleProp);
                const newDecorations = isCurrentlySet
                    ? currentDecorations.filter(deco => deco !== styleProp)
                    : [...currentDecorations, styleProp];

                return {
                    ...prevStyle,
                    textDecoration: newDecorations
                };
            }
            return prevStyle;
        });
    };

    const reset = () => {
        setTextStyle({
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: [] = [],
        });
        setColor('');
        setBackground('');
        setStyleCode('');
        setTextBackground('');
    };


  return (
      <Layout>
          <Header style={headerStyle}>Ansi Code Generator</Header>
          <Content>
              <Flex justify='center' align='center' gap='small'>
                  {/*<b> RGB ANSI Code is:</b>*/}
                  <p><b> RGB ANSI Code is:</b>
                      {textCode + textBackground
                          + (styleCode && !textBackground ? `\\x1b[` : '')
                          + (!textBackground && styleCode ? styleCode.substring(1) : styleCode + '')
                          + (textBackground || styleCode ? 'm' : '')}</p>

                  <CopyButton
                      value={textCode + textBackground
                          + (styleCode && !textBackground ? `\\x1b[` : 'AA')
                          + (!textBackground && styleCode ? styleCode.substring(1) : styleCode + 'BB')
                          + (textBackground || styleCode? 'm' : '')}>
                      {({copied, copy}) => (
                          <Button
                              color={(copied ? 'teal' : '#978ef0') as MantineColor}
                              onClick={copy}
                          >
                              {copied ? 'Copied' : 'Copy'}
                          </Button>
                      )}
                  </CopyButton>
                  <Button
                      color='#978ef0'
                      onClick={reset}
                  >
                      Reset
                  </Button>
              </Flex>


              {/*<h2><Ansi>{`${ansiCodeText}${ansiCodeBackground}${ansiCodeStyle}  Test`}</Ansi></h2>*/}
              <h2>
                  <span style={{color: color}}>
                    <span style={{backgroundColor: background,}}>
                        <span
                            style={
                                {
                                    fontWeight: textStyle.fontWeight,
                                    fontStyle: textStyle.fontStyle,
                                    textDecoration: textStyle.textDecoration.join(' ')
                                } as React.CSSProperties
                            }>Test</span>
                    </span>
                  </span>
              </h2>

              <Flex style={boxStyle} justify='center' align='center' gap='large'>
                  <Stack>
                      <h3> Text color </h3>
                      <ColorPicker format="rgba" value={color} onChange={setColor}/>
                  </Stack>

                  <Stack>
                      <h3> Background color </h3>
                      <ColorPicker format="rgba" value={background} onChange={setBackground}/>
                  </Stack>
              </Flex>

              <Flex style={boxStyleButtons} justify='center' align='center' gap='middle'>
                  <h3> Styles: </h3>
                  <Button
                      color={(textStyle["fontWeight"] === 'bold' ? 'teal' : '#978ef0') as MantineColor}
                      onClick={() => toggleStyle('fontWeight')}>
                      Toggle Bold
                  </Button>
                  <Button
                      color={(textStyle["fontStyle"] === 'italic' ? 'teal' : '#978ef0') as MantineColor}
                      onClick={() => toggleStyle('fontStyle')}>
                      Toggle Italic
                  </Button>
                  <Button
                      color={(textStyle["textDecoration"].includes('underline') ? 'teal' : '#978ef0') as MantineColor}
                      onClick={() => toggleStyle('underline')}>
                      Toggle Underline
                  </Button>
                  <Button
                      color={(textStyle["textDecoration"].includes('line-through') ? 'teal' : '#978ef0') as MantineColor}
                      onClick={() => toggleStyle('line-through')}>
                      Toggle Strikethrough
                  </Button>
              </Flex>

          </Content>
      </Layout>

  )
}

export default App
