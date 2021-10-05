import React from 'react'

export default function ChatMessage({name, content}) {
    return (
        <div>
            <p>{name}</p>
            <p>{content}</p>
        </div>
    )
}
