import Text.Regex.Base
import Text.Regex.Posix

rule1 s = (<) 2 $ length $ (getAllTextMatches $ s =~ "[aeiou]" :: [String])
rule2 s = s =~ "(.)\\1"
rule3 s = not $ s =~ "(ab|cd|pq|xy)"

rule4 s = s =~ "(..).*\\1"
rule5 s = s =~ "(.).\\1"

isNice1 s = rule1 s && rule2 s && rule3 s
isNice2 s = rule4 s && rule5 s

main = do
  input <- readFile "./day05/input"
  -- print $ length $ filter isNice1 $ lines input
  print $ length $ filter isNice2 $ lines input
