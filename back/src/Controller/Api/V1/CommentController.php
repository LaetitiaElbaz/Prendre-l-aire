<?php

namespace App\Controller\Api\V1;

use App\Entity\Comment;
use App\Form\CommentType;
use App\Repository\CommentRepository;
use App\Service\ImageUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



/**
* @Route("/api/v1/comments", name="api_v1_comments_")
*/
class CommentController extends AbstractController
{
    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(CommentRepository $commentRepository, SerializerInterface $serializer)
    {
        $comments = $commentRepository->findAll();
        $data = $serializer->normalize($comments, null, ['groups' => 'api_v1_comment']);
        return $this->json($data);
    }

    /**
     * @Route("/{id}", name="show", methods={"GET"})
     */
    public function show(Comment $comment, SerializerInterface $serializer)
    {
        $data = $serializer->normalize($comment, null, ['groups' => 'api_v1_comment']);
        return $this->json($data);
    }

    /**
     * Create a new comment
     * @Route("/", name="new", methods={"POST"})
     */
    public function new(Request $request, ImageUploader $imageUploader, SerializerInterface $serializer)
    {
        $comment = new Comment();
        $form = $this->createForm(CommentType::class, $comment, ['csrf_protection' => false]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid() ) {

            // upload of the picture 
            $fileName = $imageUploader->moveFile($form['picture']->getData(), 'images');
            $comment->setPicture($fileName);
 
            // add comment to bdd
            $comment->setUser($this->getUser());
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($comment);
            $entityManager->flush();

            // return comment in JSON
            $data = $serializer->normalize($comment, null, ['groups' => 'api_v1_comment']);
            return $this->json($data);
        }
        
        throw new \Exception('Form invalid');
    }
}
