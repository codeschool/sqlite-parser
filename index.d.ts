// Declaration file to have types in Typescript code that uses sqlite-parser
declare module 'sqlite-parser' {
    
    function sqliteParser(expression: string): sqliteParser.ParsedObject

    namespace sqliteParser {
        // some sqlite-parser types for literal types
        type dataType = 'text' | 'decimal' | 'boolean' | 'date' | 'datetime' | 'null';

        interface BaseNode {
            type: string,
        }

        interface IdentifierNode extends BaseNode {
            type: 'identifier'
            name: string
        }

        interface LiteralNode extends BaseNode {
            type: 'literal'
            value: string
            variant: dataType
        }

        interface FunctionNode extends BaseNode {
            type: 'function'
            name: IdentifierNode
            args: {expression: BaseNode[]}
        }

        interface ExpressionNode extends BaseNode {
            type: 'expression'
            format: 'binary'|'unary'
        }

        interface BinaryExpressionNode extends ExpressionNode {
            format: 'binary'
            operation: string
            left: BaseNode
            right: BaseNode
        }

        interface UnaryExpressionNode extends ExpressionNode {
            format: 'unary'
            operator: string
            expression: BaseNode
        }

        type ParsedObject = {
            type: "statement",
            variant: "list",
            statement: [
                {
                    type: "statement",
                    variant: "select",
                    result: BaseNode[]
                }
            ]
        };  
    }
    export = sqliteParser
}
