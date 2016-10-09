select *
from hats
where
  x || y BETWEEN x * 2 and x * 3
