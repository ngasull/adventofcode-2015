import Text.Regex.TDFA
import Data.Bits

-- makeBits :: Int -> Int -> Int -> Integer
-- makeBits x1 x2 y = shiftL (2^(x2-x1+1) - 1) x1 * (2^(y * 1000))
--
-- getBits :: Int -> Int -> Int -> Int -> [Integer]
-- getBits x1 y1 x2 y2 = map (makeBits x1 x2) [y1..y2]

getOp :: String -> Integer -> Integer -> Integer
getOp "turn on" s mask = s .|. mask
getOp "turn off" s mask = s - (s .&. mask)
getOp "toggle" s mask = let sub = s .&. mask in
  s - sub + (complement sub .&. mask)

-- applyInstr :: Integer -> String -> Integer
-- applyInstr s "" = s
-- applyInstr s instr =
--   let (_,_,_,[opStr, x1, y1, x2, y2]) = instr =~ "(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)" :: (String,String,String,[String]) in
--   -- foldl (getOp opStr) s $ getBits (read x1) (read y1) (read x2) (read y2)
--   getOp opStr s $ foldl1 (+) $ getBits (read x1) (read y1) (read x2) (read y2)
--
-- main = do
--   input <- readFile "./day06/input.txt"
--   print $ popCount $ foldl applyInstr 0 $ lines input


-- The algorithm above is really slow due to the bitwise operation on 1e6 bits Integers
-- Below's algo splits bitwise ops by line/y, which is way more efficient.

makeBits :: Int -> Int -> Integer
makeBits x1 x2 = shiftL (2^(x2-x1+1) - 1) x1

processY l op x1 x2 y = op (l !! y) $ makeBits x1 x2

applyInstr :: [Integer] -> String -> [Integer]
applyInstr l "" = l
applyInstr l instr =
  let (_,_,_,[opStr, x1s, y1s, x2s, y2s]) = instr =~ "(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)" :: (String,String,String,[String]) in
  let x1 = read x1s in let x2 = read x2s in
  let y1 = read y1s in let y2 = read y2s in
  (take y1 l) ++ (map (processY l (getOp opStr) x1 x2) [y1..y2]) ++ (drop (y2 + 1) l)

zero _ = 0

main = do
  input <- readFile "./day06/input.txt"
  print $ foldl1 (+) $ map popCount $ foldl applyInstr (map zero [0..999]) $ lines input

-- main = print $ foldl1 (+) $ map popCount $ foldl applyInstr (map zero [0..999]) ["turn on 0,0 through 999,999", "turn off 5,0 through 5,999", "turn off 999,500 through 999,500", "toggle 0,0 through 999,999"]
