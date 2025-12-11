<script setup lang="ts">
import { allCommentsByProduct, commentGetFormByProduct, commentCreateForm } from '~/domains/comment/composables/variables';
import useShowComment from '~/domains/comment/composables/useShowComment';
import StarRating from '~/domains/app/components/ui/starRating/index.vue';
import CommentForm from './commentForm.vue';

const props = defineProps<{
    productId: string;
}>();
// hooks
const { onGetCommentsByProduct } = useShowComment();

// init
if (props.productId) {
    commentCreateForm.value.product_id = props.productId;
    commentGetFormByProduct.value.product_id = props.productId;
    await onGetCommentsByProduct();
}
</script>

<template>
    <div class="comments-container">
        <div class="comments-list">
            <div v-for="comment in allCommentsByProduct" :key="comment.id" class="comment-item" >
                <h3>{{ comment.username }}</h3>
                <div class="comment-container">
                    <StarRating :rating="comment.rating" />
                    <p>{{ comment.text }}</p>
                </div>
            </div>
        </div>
        <div class="comment-form">
            <CommentForm />
        </div>
    </div>
</template>

<style scoped>
.comments-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .comments-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .comment-item {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            h3 {
                font-size: 1rem;
                font-weight: 600;
                color: #333333;
                text-transform: uppercase;
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

                p {
                    font-size: 1rem;
                    font-weight: 400;
                    color: #333333;
                }
            }
        }
    }
}
</style>