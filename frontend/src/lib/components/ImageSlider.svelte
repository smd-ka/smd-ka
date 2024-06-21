<style>
    .wrapper {
        width: 100vw;
        height: 350px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* Ändern Sie die Höhe auf Mobilgeräten */
    @media (max-width: 767px) {
        .wrapper {
            height: 175px;
        }
    }

    .wrapper img {
        position: absolute;
        width: 100%;
        height: 100%; /* Set height to 100% */
        object-fit: cover; /* Add object-fit: cover */
        opacity: 0;
        transition: all 2s;
        animation: imageMotion 40s infinite ease-in-out;
        transform-origin: center center;
    }
    .wrapper img.active {
        opacity: 1;
    }
    @keyframes imageMotion {
        0%, 100% { transform: scale(1.2) translate(0, 0); } /* Increase scale to 120% */
        25% { transform: scale(1.3) translate(-10%, -5%); }
        50% { transform: scale(1.4) translate(-10%, 5%); } /* Increase scale to 140% */
        75% { transform: scale(1.3) translate(-10%, -5%); }
    }
</style>

<script lang="ts">
    export let images: string[] = [];
    let activeImage = 0;
    const nextImage = () => {
        activeImage = (activeImage + 1) % images.length;
    };
    setInterval(nextImage, 10000);
</script>

<div class="wrapper">
    {#each images as image, i (image)}
        <img class={i === activeImage ? 'active' : ''}
             src={image} alt={image} />
    {/each}
</div>