#lang racket

(require racket/trace)

(provide (all-defined-out))

; Declare the structure that describes a DFA
;Esta estructura esta conformada por una funcion,el estado inicial y los estados de aceptacion o validos.
(struct dfa (func initial accept))

(define (arithmetic-lexer strng)
  " Call the function to validate using a specific DFA "
  (evaluate-dfa (dfa delta-arithmetic 'start '(int float exp var spa right_par)) strng))

(define (evaluate-dfa dfa-to-evaluate strng)
  " This function will verify if a string is acceptable by a DFA "
  (let loop
    ; Convert the string into a list of characters
    ([chars (string->list strng)];Lista con los caracteres de la expresion
     ; Get the initial state of the DFA
     [state (dfa-initial dfa-to-evaluate)] ;String del estado incial de dfa
     ; The return list with all the tokens found
     [caracter '()];Lista donde guarda el caracter
     [tokens '()]);Lista que guarda el token y el char
    (cond
      ; When the list of chars if over, check if the final state is acceptable
      [(empty? chars)
       (if (member state (dfa-accept dfa-to-evaluate))
         ; Add the last pending state to the list, and reverse it
         (reverse (cons (list (list->string (reverse caracter)) state) tokens))
         #f)]
      [else
        (let-values
          ; Call the transition function and get the new state and whether or not a token was found
          ([(new-state found) ((dfa-func dfa-to-evaluate) state (car chars))]) ;Let values variable1=new-state variable2=found. Regresa->El estado siguiente y el estado actual. LOs guarda en las variables.
          (loop (cdr chars)
                new-state
                ; The new list of pairs
                ;(if (eq? (car chars) #\space) (cdr chars) chars)
                (if found (if (eq? #\space (car chars))'()(list (car chars))) (cons (car chars) caracter))
                (if found (cons (list (list->string (reverse caracter)) found) tokens) tokens)))])))
                
                
                
                

(define (char-operator? char)
  " Identify caracters that represent arithmetic operators "
  ;Agregamos los operadores y simbolos dentro de una lista para identificarlos.
  (member char '(#\+ #\- #\* #\/ #\= #\^ )))

(define (delta-arithmetic state char)
  " Transition function to validate numbers
  This function now returns two values:
   - The new state in the automaton
   - The token that has been found. Generally false, until we are sure to have found a token
  Initial state: start
  Accept states: int float exp "
  (case state
    ['start (cond ;Initial state
       [(char-numeric? char) (values 'int #f)];If the char is an int , the next state will be int but we are not sure about the actual state.
       [(or (eq? char #\+) (eq? char #\-)) (values 'sign #f)] ;If the char is + or - , the next state will be sign but we are not sure about the actual state.
       [(or (char-alphabetic? char)(eq? char #\_)) (values 'var #f)] ;If the char is an _ or a letter  , the next state will be variable but we are not sure about the actual state.
       [(eq? char #\() (values 'left_par #f)] ;If the char is an ( , the next state will be left_par but we are not sure about the actual state.
       [else (values 'inv #f)])]
    ['sign (cond 
       [(char-numeric? char) (values 'int #f)] ;If the char is an int , the next state will be int but we are not sure about the actual state.
       [else (values 'inv #f)])]
    ['left_par (cond ;Token 
       [(eq? char #\()(values 'left_par 'left_par)]
       [(char-numeric? char) (values 'int 'left_par)] ;If the char is an int , the next state will be int but we are not sure about the actual state.
       [(or (eq? char #\+) (eq? char #\-)) (values 'sign 'left_par)] ;If the char is an + or - , the next state will be sign but we are not sure about the actual state.
       [(or (eq? char-alphabetic? char)(eq? char #\_))(values 'var 'left_par)] ;If the char is an _ or letter , the next state will be var but we are not sure about the actual state.
       [(eq? char #\space)(values 'op_space 'left_par)] ;If the char is an space , the next state will be op space but we are not sure about the actual state.
       [else (values 'inv #f)])]
     ['right_par (cond ;Accept State/Token
       [(eq? char #\))(values 'right_par 'right_par)]
       [(char-operator? char)(values 'op 'right_par)]
       [(eq? char #\space)(values 'space 'right_par)] ;If the char is a space , the next state will be space and the actual state is right par.
       [else (values 'inv #f)])]
    ['int (cond ;Accept Space/Token
       [(char-numeric? char) (values 'int #f)] ;If the char is an int , the next state will be int but we are not sure about the actual state.
       [(eq? char #\.) (values 'dot #f)] ;If the char is an . , the next state will be dot but we are not sure about the actual state.
       [(or (eq? char #\e) (eq? char #\E)) (values 'e #f)] ;If the char is an e or E , the next state will be int but we are not sure about the actual state.
       [(char-operator? char) (values 'op 'int)] ;If the char is an operator , the next state will be op and we surely know we are at the state int.
       [(eq? char #\))(values 'right_par 'int)] ;If the char is an ) , the next state will be right par and we surely know we are at the state int.
       [(eq? char #\space) (values 'spa 'int)]
       [else (values 'inv #f)])]
    ['dot (cond 
       [(char-numeric? char) (values 'float #f)] ;If the char is an dig , the next state will be a float but we are not sure about the actual state.
       [else (values 'inv #f)])] 
    ['float (cond ;Accept Space/Token
       [(char-numeric? char) (values 'float #f)] ;If the char is an dig , the next state will be float but we are not sure about the actual state.
       [(or (eq? char #\e) (eq? char #\E)) (values 'e #f)] ;If the char is an e or E , the next state will be e sign but we are not sure about the actual state.
       [(char-operator? char) (values 'op 'float)] ;If the char is an operator , the next state will be op and we surely know we are at float state.
       [(eq? char #\)) (values 'right_par 'float)] ;If the char is an ) , the next state will be right par and we surely know we are at float state.
       [(eq? char #\space) (values 'spa 'float)] ;If the char is an space , the next state will be space and we surely know we are at float state.
       [else (values 'inv #f)])]
    ['e (cond 
       [(char-numeric? char) (values 'exp #f)] ;If the char is a dig the next state will be a exp , but we are not sure about the actual state.
       [(or (eq? char #\+) (eq? char #\-)) (values 'e_sign #f)] ;If the char is a + or - the next state will be a e sign but we are not sure about the actual state.
       [else (values 'inv #f)])]
    ['e_sign (cond
       [(char-numeric? char) (values 'exp #f)] ;If the char is a dig the next state will be a exp , but we are not sure about the actual state.
       [else (values 'inv #f)])] 
    ['exp (cond ;Accept Space/Token
       [(char-numeric? char) (values 'exp #f)] ;If the char is a dig the next state will be a exp , but we are not sure about the actual state.
       [(char-operator? char) (values 'op 'exp)] ;If the char is an operator ,the next state will be a op and the actual state is exp.
       [(eq? char #\))(values 'right_par 'exp)] ;If the char is a right par the next state will be a right par and the actual state is exp.
       [(eq? char #\space) (values 'spa 'exp)] ; If the char is a space the next state will be a space and the actual state is exp.
       [else (values 'inv #f)])]
    ['var (cond ;Accept Space/Token
       [(or (eq? char #\_)(char-alphabetic? char)) (values 'var #f)] ;If the char is a right letter or _ the next state will be a right par but we dont know the actual state.
       [(char-numeric? char) (values 'var #f)] ;If the char is a dig the next state will be a var but we dont know the actual state.
       [(char-operator? char) (values 'op 'var)] ;If the char is an operator the next state will be a op and the actual state is var.
       [(eq? char #\))(values 'right_par 'var)] ;If the char is an ) the next state will be a right par and the actual state is var.
       [(eq? char #\space) (values 'spa 'var)] ;If the char is an space the next state will be a space and the actual state is var.
       [else (values 'inv #f)])]
    ['op (cond ;Token
       [(char-numeric? char) (values 'int 'op)] ;If the char is a dig the next state will be a op and the actual state is op.
       [(or (eq? char #\+) (eq? char #\-)) (values 'sign 'op)] ;If the char is an operator the next state will be a op and the actual state is op.
       [(or (eq? char #\_)(char-alphabetic? char)) (values 'var 'op)]  ;If the char is an operator the next state will be a op and the actual state is op.
       [(eq? char #\() (values 'left_par 'op)]  ;If the char is an ( the next state will be a left par and the actual state is op.
       [(eq? char #\space) (values 'op_spa 'op)]  ;If the char is a space the next state will be a space and the actual state is op.
       [else (values 'inv #f)])]
     ['spa (cond  ;Accept State
       [(char-operator? char) (values 'op #f)] 
       [(eq? char #\space) (values 'spa #f)]
       [else (values 'inv #f)])]
    ['op_spa (cond 
       [(char-numeric? char) (values 'int #f)]
       [(or (eq? char #\+) (eq? char #\-)) (values 'sign #f)]
       [(or (eq? char #\_)(char-alphabetic? char)) (values 'var #f)]
       [(eq? char #\() (values 'left_par #f)]
       [(eq? char #\space) (values 'op_spa #f)]
       [else (values 'inv #f)])]
    [else (values 'inv #f)]))


