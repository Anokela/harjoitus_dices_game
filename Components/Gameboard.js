import { View, Text, Pressable } from 'react-native';
import React, {useState, useEffect } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;

export default function Gameboard() {
  const [nbrOfThrowsLeft, setnbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [nbrOfWins,setnbrOfWins] = useState(0);
  const [sum, setSum] = useState(0);
  const [status, setStatus] = useState('');

  function checkWinner() {
    if (sum >= WINNING_POINTS && nbrOfThrowsLeft > 0) {
      setnbrOfWins(nbrOfWins + 1);
      setStatus('You Won!');
    }
    else if (sum >= WINNING_POINTS && nbrOfThrowsLeft === 0) {
      setnbrOfWins(nbrOfWins+1);
      setStatus('You won, game over');
    }
    else if(nbrOfWins > 0 && nbrOfThrowsLeft === 0) {
      setStatus('You won, game over');
    }
    else if (nbrOfThrowsLeft === 0) {
      setStatus('You did not win');
    }
     else {
       setStatus('Keep on throwing');
     }
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Game has not started yet');
    }
    if (nbrOfThrowsLeft < 0) {
      setnbrOfThrowsLeft(NBR_OF_THROWS - 1);
      setnbrOfWins(0);
    }
  }, [nbrOfThrowsLeft]);

  function throwDices() {
    let sum = 0;
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
      sum+= randomNumber;
    }
    setnbrOfThrowsLeft(nbrOfThrowsLeft-1);
    setSum(sum);
  }

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <MaterialCommunityIcons
        name={board[i]}
        key={"row" + i}
        size={50}
        color={'steelblue'}>
      </MaterialCommunityIcons>
    )
  }

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Sum: {sum}</Text>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>Nbr of wins: {nbrOfWins}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={()=> throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
    </View>
  );
}

