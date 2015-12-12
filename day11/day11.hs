import Data.Char

firstRule :: String -> Bool
firstRule pass
  | length pass < 3 = False
  | otherwise = let (a:rest@(b:c:_)) = pass in
    ord a == ord b - 1 && ord a == ord c - 2 || firstRule rest

secondRule :: String -> Bool
secondRule pass = not $ foldl1 (||) $ map (flip elem pass) "iol"

thirdRule :: [Char] -> String -> Bool
thirdRule _ "" = False
thirdRule _ (a:"") = False
thirdRule pairs (a:next@(b:rest))
  | a == b && not(a `elem` pairs) =
    length pairs > 0 || thirdRule (a : pairs) rest
  | otherwise = thirdRule pairs next

allRules :: String -> Bool
allRules pass = firstRule pass && secondRule pass && thirdRule [] pass

incrementPass :: String -> String
incrementPass pass
  | last pass == 'z' = (incrementPass $ init pass) ++ ['a']
  | otherwise = init pass ++ [chr $ ord (last pass) + 1]

nextPass :: String -> String
nextPass pass
  | allRules pass = pass
  | otherwise = nextPass $ incrementPass pass

main = print $ nextPass "vzbxkghb"
-- main = print $ nextPass $ incrementPass "vzbxxyzz"
