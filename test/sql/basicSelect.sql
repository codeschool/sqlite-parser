SELECT a.quantity, SUM(price, 1.120), type, 'string''s'
FROM apples AS a
WHERE quantity > 1
GROUP BY type
ORDER BY type ASC
