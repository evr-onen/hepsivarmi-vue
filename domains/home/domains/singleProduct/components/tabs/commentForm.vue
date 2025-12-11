<script setup lang="ts">
import TextAreaInput from '~/domains/app/components/form/TextAreaInput/index.vue';
import StarRating from '~/domains/app/components/ui/starRating/index.vue';
import { commentCreateForm } from '~/domains/comment/composables/variables';
import Button from '~/domains/app/components/form/Button/index.vue';
import useCreateComment from '~/domains/comment/composables/useCreateComment';

const { onCreateComment } = useCreateComment();

const onSubmitComment = async() => {
    console.log(commentCreateForm.value);
    await onCreateComment();
}
</script>

<template>
    <div class="comment-form-container">
        <h3>Add Your Comment</h3>
        <div class="comment-container">
            <StarRating v-model="commentCreateForm.rating" :readonly="false" />
            <TextAreaInput v-model="commentCreateForm.text" placeholder="Comment" />
        </div>
        <Button class="button-submit" severity="gradient" color="primary" :disabled="commentCreateForm.rating === 0 || commentCreateForm.text === ''" @click="onSubmitComment">Submit</Button>
    </div>
</template>

<style scoped>
.comment-form-container {
    width: 100%;

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #333333;
        text-transform: uppercase;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .comment-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: #EEEEEE;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e0e0e0;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        textarea {
            width: 100%;
            height: 100px;
            border: 1px solid #e0e0e0;
            border-radius: 0.5rem;
            padding: 0.5rem;
            background-color: transparent;
        }
    }

    .button-submit {
        margin-left: auto;
        margin-top: 1rem;
        width: fit-content;
        padding-inline: 2rem;
    }

}
</style>