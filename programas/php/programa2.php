<?php
function esPar($n) {
  return $n % 2 === 0;
}

echo esPar(6) ? "true" : "false"; // Output: true
echo esPar(7) ? "true" : "false"; // Output: false
?>